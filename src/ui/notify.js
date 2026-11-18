const message = document.getElementById("message_Ajouter");
export function message_ajouter_error(status) {
    message.removeAttribute("hidden");

    if (status) {
        message.className = "bg-[#155724] text-[#d4edda] p-3";
        message.textContent = "cette serie est ajouter avec succes "
    } else {
        message.className = "bg-[#985959] text-[#d4edda] p-3";
        message.textContent = "cette  serie n'est pas ajouter avec succes "
    }
    setTimeout(() => {
        message.setAttribute("hidden", "");
    }, 2000)
}

export function message_delete_serie(status) {
    message.removeAttribute("hidden");
    if (status) {
        message.className = "bg-[#155724] text-[#d4edda] p-3";
        message.textContent = "le serie a été supprimer avec succes"
    } else {
        message.textContent = "cette serie n'supprimer "
        message.className = "bg-[#985959] text-[#d4edda] p-3";
        
    }
    setTimeout(() => {
    message.setAttribute("hidden", "");
    }, 2000)
}