import { useState } from "react";

function MyRow(props) {
    const [selectedSign, setSelectedSign] = useState(props.sign || '+');
    const [number, setNumber] = useState(props.number || null);
    const [mode, setMode] = useState(props.mode);
    const [disabled, setDisabled] = useState(props.disabled || 'false');

    const handleChange = (key, value) => {
        let isSign = false;
        if (key === 'sign') 
            {
                isSign = true;
                setSelectedSign(value);

            }
        else setNumber(value);
        
        // Propagate changes immediately in 'view' mode
        if (mode === 'view') {
            let object = {}
            if (!isSign)
                object = { key: props.rowKey, sign: selectedSign, number: value, disabled: disabled };
            else
                object = { key: props.rowKey, sign: value, number: number, disabled: disabled };
            props.onEdit(object);
        }
    };

    const handleDisableChange = () => {
        let newDisabledVal = '';
        if (disabled === 'false')
            newDisabledVal = 'true';
        else
            newDisabledVal = 'false';
        setDisabled(newDisabledVal);
        props.onDisable({ key: props.rowKey, sign: selectedSign, number: number, disabled: newDisabledVal });
    };

    const handleDeleteChange = () => {
        props.onDelete(props.rowKey);
    }

    const handleAddClick = () => {
        const object = {key: props.numberRows, sign: selectedSign, number: number, disabled: disabled}
        props.onAdd(object);
    }

    return (
        <>
            <select value={selectedSign} onChange={(e) => handleChange('sign', e.target.value)}>
                <option value="+">+</option>
                <option value="-">-</option>
            </select>
            <input type="text" value={number} onChange={(e) => handleChange('number', e.target.value)} />

            {mode === 'view' ? (
                <>
                    <button onClick={handleDeleteChange}>Delete</button>
                    <button onClick={handleDisableChange}>{disabled === 'false' ? 'Disable' : 'Enable'}</button>
                </>
            ) : (
                <>
                    <button onClick={() => {
                        handleAddClick();
                        setMode('view');
                    }}>Add</button>
                    <button onClick={props.onCancel}>Cancel</button>
                </>
            )}
        </>
    );
}

export default MyRow;
