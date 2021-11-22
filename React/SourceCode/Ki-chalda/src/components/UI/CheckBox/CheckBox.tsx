import React, { Fragment } from 'react';
import { ICheckBoxList} from '../../../interfaces/IcheckboxList';
interface checkBoxItems {
    checkBoxItems: Array<ICheckBoxList>,
    handleChecked: (selectedValue: string, isChecked: boolean) => void
}

const CheckBox = React.memo((props: checkBoxItems) => {
    return (
        <Fragment>
            {
                props.checkBoxItems && props.checkBoxItems.length > 0 &&
                 
                props.checkBoxItems.map((item) => {
                    return (<div key={item.value}><label >
                        <input
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { props.handleChecked(item.value, event.target.checked) }}
                            type="checkbox" checked={item.isChecked} value={item.value} />
                        <span style={{ margin: "5px" }}>{item.text}</span>
                    </label></div>);

                }
                )
                      
                     
            }
        </Fragment>
    )
});

export default CheckBox;