import { CustomSelect, Modal } from '@/core/constants';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { appointementActionThunk, patientActionThunk } from '@/redux/app';
import { useEffect, useState } from 'react';

interface EditAppointementModal {
    data?: {
        id: number;
        dateTime: string;
        duration: number;
        patientId: number;
        doctorId: number;
        status: string;
        notes: string;
        salleId: number;
        factureId: null | number;
    };
}
// Default appointment object
const defaultAppointment = {
    id: 0,
    dateTime: "",
    duration: 0,
    patientId: 0,
    doctorId: 0,
    status: "",
    notes: "",
    salleId: 0,
    factureId: null,
};
export const EditAppointementModal: React.FC<EditAppointementModal> = ({ data }) => {
    const dispatch = useAppDispatch();
    const [selectedAppointement, setSelectedAppointement] = useState(
        data || defaultAppointment
    );
    const patients = useAppSelector((state) => state.patient.patients);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (data) {
                setSelectedAppointement(data);
                if (patients.length ==0) {
                    await dispatch(patientActionThunk.getPatients());
                }
                setSelectedOption({
                    key:selectedAppointement.patient?.id,
                    value:selectedAppointement.patient?.name
                })
            } else {
                setSelectedAppointement(defaultAppointment);
            }
        };

        fetchData(); // Call the async function
    }, [data,dispatch]);

    const [selectedOption, setSelectedOption] = useState<{ key: string; value: string } | undefined>(undefined);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedAppointement({ ...selectedAppointement, [name]: value });
    };

    const handleEditAppointement = async () => {
        setIsLoading(true);
        try {
            const formData = {
                dateTime : selectedAppointement.dateTime+ ":00",
                duration : selectedAppointement.duration,
                patientId : selectedOption.key,
                status : selectedAppointement.status,
                notes : selectedAppointement.notes,
            }
            await dispatch(appointementActionThunk.EditAppointement(formData,selectedAppointement.id)); 
           // @ts-ignore
           $('#editAppointement').modal('hide');
        } catch (error) {
            console.error('Failed to edit Appointement:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Modal id="editAppointement" title="Modifier un Rendez-vous" size="lg">
            <form onSubmit={(e) => { e.preventDefault(); handleEditAppointement(); }}>
            <div className="modal-body">
                
                <div className="row">
                <div className='col-12 mb-3'>
                    <CustomSelect
                        label="Patients"
                        placeholder="Selectionner un patient"
                        modelValue={selectedOption}
                        data={patients.map((item) => ({
                            key: item.id,
                            value: item.name,
                          }))}
                        onUpdate={setSelectedOption}
                    />
                </div>
                    <div className="col-6 mb-3">
                        <input
                            type="datetime-local"
                            name="dateTime"
                            placeholder="Date"
                            value={selectedAppointement.dateTime}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <input
                            type="number"
                            name="duration"
                            placeholder="Duration"
                            value={selectedAppointement.duration}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-12 mb-3">
                        
                        <select name="status" id="status" value={selectedAppointement.status} onChange={handleInputChange}>
                            <option value="pending">En Attente</option>
                            <option value="cancelled">Annulé</option>
                            <option value="absent">Absent</option>
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <textarea
                            name="notes"
                            placeholder="Notes"
                            value={selectedAppointement.notes}
                            className="border p-2 w-full"
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-label-outline-dark"
                        data-bs-dismiss="modal"
                    >
                        Fermer
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <span className="d-flex align-items-center">
                                    <div
                                        className="spinner-border spinner-border-sm text-white"
                                        role="status"
                                    >
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </span>
                            ) : (
                                <span>Terminer</span>
                            )}
                        </button>
                </div>
            </div>
            </form>
        </Modal>
    );
};
