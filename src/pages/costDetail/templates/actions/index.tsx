import { useContext, useState } from 'react';
import { FAB } from 'react-native-paper';
import { FieldsContext } from '../../contexts/fields';
import useSave from '../../hooks/useSave';
import useDelete from '../../hooks/useDelete';

const Actions = () => {

    const { fields } = useContext(FieldsContext)

    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

    const { handleSave } = useSave()
    const { handleDelete } = useDelete()


    const action = [
        {
            icon: 'content-save-check',
            label: 'Salvar',
            onPress: handleSave,
            color: '#fff',
            style: {
                backgroundColor: "#1B1C1F",
            },
            labelTextColor: "#fff"
        },
        {
            icon: 'trash-can',
            label: 'Deletar',
            onPress: handleDelete,
            color: '#fff',
            style: {
                backgroundColor: "#1B1C1F",
            },
            labelTextColor: "#fff"
        },
    ]

    if(!fields.id){
        action.splice(1, 1)
    }

    return (
        <FAB.Group
            backdropColor='#0000008a'
            open={open}
            visible
            icon={'dots-horizontal'}
            color='#fff'
            fabStyle={{
                backgroundColor: "#1B1C1F"
            }}
            actions={action}
            onStateChange={onStateChange}
            onPress={() => {
                if (open) {
                    // do something if the speed dial is open
                }
            }}
        />
    );
};

export default Actions;