let autenticado = sessionStorage.getItem("auth");
if(autenticado != "true"){
    window.location = "../../index.html";
}