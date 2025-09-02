import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';

interface DialogModalProps {
    show: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
}

export default function DialogModal({ show, onClose, title, content, footer }: DialogModalProps) {
    return (
        <Dialog open={show} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                {title && (
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                )}
                {content && (
                    <div className="mt-4">
                        {content}
                    </div>
                )}
                {footer && (
                    <DialogFooter>
                        {footer}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}