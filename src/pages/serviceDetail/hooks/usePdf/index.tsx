import { useContext } from "react";
import { GlobalAlertContext } from "../../../../contexts/GlobalAlertContext";
import { api } from "../../../../services/api";
import { FieldsContext } from "../../contexts/fields";
// import Share from 'react-native-share';
import { apiUrl } from "../../../../services/apiUrl";
// import { Share } from "react-native";

export default function usePdf() {
    const { showLoading, hideLoading } = useContext(GlobalAlertContext)
    const { fields } = useContext(FieldsContext)

    const generatePdf = async () => {
        showLoading()
        try {

            // const { data: pdf } = await api({ method: "get", url: "/service/os/" + fields.id, });
            // const data = Uint8Array.from(pdf.pdf.data);
            // const reponseShare = await Share.open({
            //     url: `${apiUrl}/files/os-${fields.id}.pdf`,
            //     message: "teste"
            // })
            // const content = new Blob([data.buffer], { type: "application/pdf" });
            // const result = await Share.share({
            //     url: data.bu,

            // });
            // Share.open({
            //     message: "PDF",
            //     url: `${apiUrl}/files/os-${fields.id}.pdf`
            // })
            // .then(res => console.log(res))
            // .catch(res => console.log(res))

        } catch (error) {

        }

        hideLoading()
    };

    return {
        generatePdf
    }
}