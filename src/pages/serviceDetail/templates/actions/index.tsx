import * as React from 'react';
import { FAB, Portal, PaperProvider } from 'react-native-paper';

const Actions = () => {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }: { open: boolean }) => setState({ open });

    const { open } = state;

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
                    onPress: () => console.log('Pressed star'),
                    rippleColor: "#1d1d2e",
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
                    rippleColor: "#1d1d2e",
                    color: '#fff',
                    style: {
                        backgroundColor: "rgb(28, 27, 31)",
                    },
                    labelTextColor: "#fff"
                },
                {
                    icon: 'table-row-plus-after',
                    label: 'Adicionar serviço',
                    onPress: () => console.log('Pressed notifications'),
                    rippleColor: "#1d1d2e",
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