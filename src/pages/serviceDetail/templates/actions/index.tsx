import { useContext, useState } from 'react';
import { FAB } from 'react-native-paper';
import { FieldsContext } from '../../contexts/fields';
import useSave from '../../hooks/useSave';

const Actions = () => {

    const { handleAddService } = useContext(FieldsContext)

    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

    const { handleSave } = useSave()

    return (
        <FAB.Group
            backdropColor='#0000008a'
            open={open}
            visible
            icon={'dots-horizontal'}
            color='#fff'
            fabStyle={{
                backgroundColor: "rgb(28, 27, 31)"
            }}
            actions={[
                {
                    icon: 'content-save-check',
                    label: 'Salvar',
                    onPress: handleSave,
                    color: '#fff',
                    style: {
                        backgroundColor: "rgb(28, 27, 31)",
                    },
                    labelTextColor: "#fff"
                },
                {
                    icon: 'trash-can',
                    label: 'Deletar',
                    onPress: () => console.log('Pressed email'),
                    color: '#fff',
                    style: {
                        backgroundColor: "rgb(28, 27, 31)",
                    },
                    labelTextColor: "#fff"
                },
                {
                    icon: 'table-row-plus-after',
                    label: 'Adicionar serviço',
                    onPress: handleAddService,
                    color: '#fff',
                    style: {
                        backgroundColor: "rgb(28, 27, 31)",
                    },
                    labelTextColor: "#fff"
                },
            ]}
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