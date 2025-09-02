import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ActionSection from '@/Components/ActionSection';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import route from 'ziggy-js';
import { cn } from '@/lib/utils';

interface DeleteTeamFormProps {
    team: any;
    className?: string;
}

const DeleteTeamForm: React.FC<DeleteTeamFormProps> = ({ team, className }) => {
    const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);
    const form = useForm({});

    const confirmTeamDeletion = () => {
        setConfirmingTeamDeletion(true);
    };

    const deleteTeam = () => {
        form.delete(route('teams.destroy', team), {
            errorBag: 'deleteTeam',
        });
    };

    return (
        <ActionSection
            title="Delete Team"
            description="Permanently delete this team."
            content={
                <>
                    <div className="max-w-xl text-sm text-gray-600">
                        Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain.
                    </div>

                    <div className="mt-5">
                        <Button 
                            variant="destructive"
                            onClick={confirmTeamDeletion}
                        >
                            Delete Team
                        </Button>
                    </div>

                    {/* Delete Team Confirmation Modal */}
                    <Dialog open={confirmingTeamDeletion} onOpenChange={setConfirmingTeamDeletion}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Team</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted.
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setConfirmingTeamDeletion(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={deleteTeam}
                                    disabled={form.processing}
                                    className={cn("ms-3", form.processing && "opacity-25")}
                                >
                                    Delete Team
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            }
        />
    );
};

export default DeleteTeamForm;