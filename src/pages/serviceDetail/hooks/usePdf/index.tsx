import { useContext } from "react";
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext";
import { api } from "../../../../services/api";
import { FieldsContext } from "../../contexts/fields";
// import Share from 'react-native-share';
import { Buffer } from 'buffer'
import { apiUrl } from "../../../../services/apiUrl";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import useSave from "../useSave";
export default function usePdf() {
    const { showLoading, hideLoading } = useContext(GlobalAlertContext)
    const { fields } = useContext(FieldsContext)
    const { handleSave } = useSave()

    const generatePdf = async () => {
        showLoading()
        try {
            if (fields.id) {
                await handleSave()
                showLoading()
            }
            const { data: pdf } = await api({ method: "get", url: "/service/os/" + fields.id, });

            FileSystem.downloadAsync(
                `${apiUrl}/files/os-${fields.id}.pdf`,
                FileSystem.documentDirectory + `os-${fields.id}.pdf`
            )
                .then(({ uri }) => {
                    Sharing.shareAsync(uri);

                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {

        }

        hideLoading()
    };

    return {
        generatePdf
    }
}