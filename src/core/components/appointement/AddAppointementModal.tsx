import { CustomSelect, Modal } from '@/core/constants';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { appointementActionThunk, patientActionThunk, ressourceActionThunk } from '@/redux/app';
import { useEffect, useState } from 'react';



export const AddAppointementModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const [appointement, setAppointement] = useState({
        id: 0,
        dateTime: "",
        duration: 0,
        patientId: 0,
        doctorId: 0,
        status: "",
        notes: "",
        salleId: 0,
        factureId: null,
    });
    const patients = useAppSelector((state) => state.patient.patients);
    const salles = useAppSelector((state) => state.ressource.salle);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (patients.length ==0) {
                await dispatch(patientActionThunk.getPatients());
                
            }
        };
        const fetchSalles = async () => {
            await dispatch(ressourceActionThunk.getSalles());
        };
        fetchSalles();

        fetchData(); // Call the async function
    }, [dispatch]);

    const [selectedOption, setSelectedOption] = useState<{ key: string; value: string } | undefined>(undefined);
    const [selectedOptionSalle, setSelectedOptionSalle] = useState<{ key: string; value: string } | undefined>(undefined);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAppointement({ ...appointement, [name]: value });
    };

    const handleEditAppointement = async () => {
        setIsLoading(true);
        try {
            const formData = {
                dateTime : appointement.dateTime+ ":00",
                duration : appointement.duration,
                patientId : selectedOption.key,
                status : appointement.status,
                notes : appointement.notes,
                salleId : selectedOptionSalle.key
            }
            await dispatch(appointementActionThunk.AddAppointement(formData)); 
           // @ts-ignore
           $('#addNewAppointement').modal('hide');
        } catch (error) {
            console.error('Failed to edit Appointement:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Modal id="addNewAppointement" title="Nouveau Rendez-vous" size="lg">
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
                                value={appointement.dateTime}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="number"
                                name="duration"
                                placeholder="Duration"
                                value={appointement.duration}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mt-4">
                            <select name="status" id="status" value={appointement.status} onChange={handleInputChange} className="border p-2 w-full">
                                <option value="" selected disabled>Choisir une option</option>
                                <option value="pending">En Attente</option>
                                <option value="cancelled">Annulé</option>
                                <option value="absent">Absent</option>
                                <option value="passed">Passé</option>
                            </select>
                        </div>
                        <div className='col-6 mb-3'>
                            <CustomSelect
                                label="Salle"
                                placeholder="Selectionner une salle"
                                modelValue={selectedOptionSalle}
                                data={salles.map((item) => ({
                                    key: item.id,
                                    value: item.name,
                                }))}
                                onUpdate={setSelectedOptionSalle}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <textarea
                                name="notes"
                                placeholder="Notes"
                                value={appointement.notes}
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
