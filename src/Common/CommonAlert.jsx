import { confirmAlert } from "react-confirm-alert";

export function isNullEmpty(e) {

    if (e === null || e === ''|| e===undefined) {
        return true;
    }
    return false;
   }

   export function showAlert(msg){

    confirmAlert({
        title: "Alert!",
        closeOnClickOutside:false,
        message: msg,
        buttons: [
          {
            label: 'Ok',
            onClick: () => { return false }
          },

        ]
      })
}

export function showSuccess(msg){

  confirmAlert({
      message: msg,
      closeOnClickOutside:false,
      buttons: [
        {
          label: 'Ok',
          onClick: () => { return false }
        },

      ]
    })
}


  
