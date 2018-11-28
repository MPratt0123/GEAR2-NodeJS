import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {styles as styles} from './styles';

const GSelectControl = ({field}) => {
    if(field.nameField === undefined) {
        field.nameField = 'name';
    }

    if(field.value === undefined || field.value === null) {
        field.value = ' ';
    }

    return (
        <div>
            <InputLabel className={styles.fieldLabel} htmlFor={field.id} disabled={field.disabled === true}>{field.label}</InputLabel>
            <br/>
            <Select native fullWidth={true}
                    onChange={(e) => field.handleChange(e, field.id)}
                    value={field.value === null ? '' : field.value}>
                <option value=" "/>
                {field.choices.map(data => {
                    return (
                        <option key={data.id} value={data.id}>{data[field.nameField]}</option>
                    )
                })}
            </Select>
            <br/><br/>
        </div>
    )
};

export default GSelectControl;