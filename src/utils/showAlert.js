import { store } from 'react-notifications-component';

export default function showAlert(messageAlert, typeAlert) {
    return store.addNotification({
        title: "Thông báo",
        message: messageAlert,
        type: typeAlert,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 4000,
            onScreen: true,
            showIcon: true,
        },
    })
}