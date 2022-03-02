/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const appNode = document.querySelector("#app");

//web api
const baseUrl = "https://platzi-avo.vercel.app";

//intl (format fechas o monedas)
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('es', {
        style: "currency",
        currency: "EUR",
    }).format(price)
    return newPrice;
};

//Conectarnos al server
window.fetch(`${baseUrl}/api/avo`)
// procesar la respuesta y convertirla en JSON
.then((respuesta) => respuesta.json())
// JSON -> Data -> Renderizar info browser
.then(responseJson => {
    const todosLosItems = []
    responseJson.data.forEach(item => {
        // crear imagen
        const imagen = document.createElement('img');
        imagen.src = `${baseUrl}${item.image}`;
        imagen.className = "h-16 w-16 md:h-36 md:w-36 mb-5 rounded-full mx-auto md:mx-0 md:mr-6";
        // crear titulo
        const title = document.createElement('h2');
        title.textContent = item.name;
        title.className = "text-lg font-bold text-center md:text-left mb-2";
        // crear precio
        const price = document.createElement('div');
        price.textContent = formatPrice(item.price);
        price.className = "text-2xl font-bold text-green-500 text-center md:text-left mb-2";

        const description = document.createElement('div');
        description.textContent = item.attributes.description;
        description.className = "text-left md:text-justify"

        const container = document.createElement('div')
        container.append(imagen, title, price, description);   
        container.className = "bg-white rounded-lg p-6 bg-gray-100 hover:bg-gray-300";
        
        todosLosItems.push(container);
    });

    appNode.append(...todosLosItems);
});
