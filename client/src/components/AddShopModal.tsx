import React, { useState } from 'react';
import { createShop } from '../services/shopService';


type Props = {
    onClose: () => void;
};


const AddShopModal: React.FC<Props> = ({ onClose }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createShop({ name });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Shop</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Shop Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddShopModal;