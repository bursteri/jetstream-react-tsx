import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import InputError from '@/Components/InputError';

interface ConfirmsPasswordProps {
    title?: string;
    content?: string;
    button?: string;
    children: React.ReactNode;
    onConfirmed: () => void;
}

export default function ConfirmsPassword({
    title = 'Confirm Password',
    content = 'For your security, please confirm your password to continue.',
    button = 'Confirm',
    children,
    onConfirmed,
}: ConfirmsPasswordProps) {
    const [open, setOpen] = useState(false);
    const form = useForm({
        password: '',
    });

    const confirmPassword = () => {
        form.post(route('password.confirm'), {
            onSuccess: () => {
                form.reset();
                setOpen(false);
                setTimeout(() => onConfirmed(), 250);
            },
            onError: () => {
                form.reset('password');
            },
            onFinish: () => {
                form.reset('password');
            },
        });
    };

    const handleClick = () => {
        // Check if password was recently confirmed
        axios.get(route('password.confirmation')).then(response => {
            if (response.data.confirmed) {
                onConfirmed();
            } else {
                setOpen(true);
            }
        });
    };

    return (
        <>
            <div onClick={handleClick}>{children}</div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{content}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.data.password}
                                onChange={(e) => form.setData('password', e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        confirmPassword();
                                    }
                                }}
                                placeholder="Password"
                                autoFocus
                            />
                            <InputError message={form.errors.password} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmPassword} disabled={form.processing}>
                            {button}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}