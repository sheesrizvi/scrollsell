import React from 'react';
import AppButton from '../AppButton';
import { useFormikContext } from 'formik';

function SubmitButton({title, style}) {
    const {handleSubmit} = useFormikContext()
    return (
        <AppButton
        style={style}
              title={title}
              onPress={handleSubmit}
            //   style={{margin: 40}}
            />
    );
}

export default SubmitButton;