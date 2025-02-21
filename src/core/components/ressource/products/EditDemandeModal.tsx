import { CustomSelect, Modal } from '@/core/constants';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { appointementActionThunk, patientActionThunk, ressourceActionThunk } from '@/redux/app';
import { useEffect, useState } from 'react';

interface EditDemandeModal {
    demande?: {
        id: number;
        quantity: string;
        usageDescription: number;
        produitId: number;
    };
}
// Default appointment object
const defaultDemande = {
    id: 0,
    quantity: 0,
    usageDescription: '',
    produitId: 0
};
export const EditDemandeModal: React.FC<EditDemandeModal> = ({ demande }) => {
    const dispatch = useAppDispatch();
    const [selectedDemande, setSelectedDemande] = useState(
        demande || defaultDemande
    );
    const products = useAppSelector((state) => state.ressource.products);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (demande) {
                setSelectedDemande(demande);
                if (products.length ==0) {
                    await dispatch(ressourceActionThunk.getProducts());
                }
                console.log(demande);
                
                setSelectedOption({
                    key:selectedDemande.produit?.id,
                    value:selectedDemande.produit?.name
                })
            } else {
                setSelectedDemande(defaultDemande);
            }
        };

        fetchData(); // Call the async function
    }, [demande,dispatch]);

    const [selectedOption, setSelectedOption] = useState<{ key: string; value: string } | undefined>(undefined);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedDemande({ ...selectedDemande, [name]: value });
    };

    const handleEditAppointement = async () => {
        setIsLoading(true);
        try {
            const formData = {
                quantity: selectedDemande.quantity,
                usageDescription: selectedDemande.usageDescription,
                produitId : selectedOption.key,
            }
            await dispatch(ressourceActionThunk.EditDemande(formData,selectedDemande.id)); 
           // @ts-ignore
           $('#edit-demande').modal('hide');
        } catch (error) {
            console.error('Failed to edit Demande:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Modal id="edit-demande" title="Modifier une Demnde" size="lg">
            <form onSubmit={(e) => { e.preventDefault(); handleEditAppointement(); }}>
            <div className="modal-body">
                
                <div className="row">
                <div className='col-12 mb-3'>
                    <CustomSelect
                        label="Produits"
                        placeholder="Selectionner un produit"
                        modelValue={selectedOption}
                        data={products.map((item) => ({
                            key: item.id,
                            value: item.name,
                          }))}
                        onUpdate={setSelectedOption}
                    />
                </div>
                <div className="col-12 mb-3">
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantite"
                                value={selectedDemande.quantity}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                                min="1"
                                required
                            />
                        </div>
                        
                        <div className="col-12 mb-3">
                            <textarea name="usageDescription" required
                                placeholder="Description"
                                value={selectedDemande.usageDescription} onChange={handleInputChange} className="border p-2 w-full"></textarea>
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
