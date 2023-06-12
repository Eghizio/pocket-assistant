
const Url = {
	receipts: () => "/api/transactions/receipts",
	products: (receiptId) => `/api/transactions/receipts/${receiptId}`,
};

const getReceipts = () => fetch(Url.receipts())
	.then(res => res.json()).catch(console.error);

const getProducts = (receiptId) => fetch(Url.products(receiptId))
	.then(res => res.json()).catch(console.error);

const createProducts = (products) => {
	return products.map(({ id, name, price }) => {
		const container = document.createElement("section");

		const nameH = document.createElement("h5");
		nameH.textContent = name;

		const idP = document.createElement("div");
		idP.textContent = id;

		const priceP = document.createElement("div");
		priceP.textContent = price;

		container.appendChild(idP);
		container.appendChild(nameH);
		container.appendChild(priceP);

		return container;
	});
};

const createReceipts = (receipts) => {
	return receipts.map(({ id, date }) => {
		const container = document.createElement("article");

		const dateP = document.createElement("div");
		dateP.textContent = date;

		const idP = document.createElement("div");
		idP.textContent = id;

		const btn = document.createElement("button");
		btn.textContent = "Load products";

		const productsList = document.createElement("ul");

		btn.addEventListener("click", async () => {
			const products = await getProducts(id);
			const elems = createProducts(products);
			productsList.innerHTML = "";
			productsList.append(...elems);
		});

		container.appendChild(idP);
		container.appendChild(dateP);
		container.appendChild(btn);
		container.appendChild(productsList);

		return container;
	});
};

(async () => {
	const receipts = await getReceipts();
	const elems = createReceipts(receipts);

	const root = document.querySelector("div#receipts");
	root.append(...elems);
})();