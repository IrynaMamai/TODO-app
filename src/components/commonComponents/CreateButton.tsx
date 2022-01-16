
import { Button, Icon } from '@ui-kitten/components';
import React from 'react';

interface ICreateButton {
    showModalAndForm: (val: boolean) => void
}

const CreateButton: React.FC<ICreateButton> = ({ showModalAndForm }) => {
    console.log('CreateButton');

    return (
        <Button style={{ margin: 5, marginLeft: 10 }}
            onPress={() => showModalAndForm(true)}
            status='success'
            accessoryLeft={<Icon name='plus-outline' />} />
    )
}

export const MemoizedCreateButton = React.memo(CreateButton);