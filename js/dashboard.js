import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {

   
    const addProductModalElement = document.getElementById('addProductModal');
    const addProductButton = document.getElementById('add-product-btn');
    const logoutButton = document.getElementById('logout-button');
    const addProductForm = document.getElementById('add-product-form');

    if (!addProductModalElement || !addProductButton || !logoutButton || !addProductForm) {
        console.error("A critical element is missing from the dashboard.html page. Please check your HTML.");
        return;
    }

    
    const addProductModal = new bootstrap.Modal(addProductModalElement);

   
    addProductButton.addEventListener('click', () => {
        addProductModal.show();
    });

   
    addProductModalElement.addEventListener('hidden.bs.modal', () => {
        addProductButton.focus();
    });

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = addProductForm['product-title'].value;
        const description = addProductForm['product-description'].value;
        const price = addProductForm['product-price'].value;
        const user = auth.currentUser;

        if (user) {
            try {
                await addDoc(collection(db, "products"), {
                    userId: user.uid,
                    title: title,
                    description: description,
                    price: parseFloat(price),
                    createdAt: serverTimestamp()
                });

                addProductForm.reset();
                addProductModal.hide(); 
                
                Swal.fire({
                    title: 'Product Added!',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });

            } catch (error) {
                 Swal.fire({
                    title: 'Error Adding Product',
                    text: error.message,
                    icon: 'error'
                });
            }
        }
    });

    logoutButton.addEventListener('click', async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    });


   
    onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchAndDisplayProducts(user.uid);
        } else {
            window.location.href = 'login.html';
        }
    });
});


function fetchAndDisplayProducts(userId) {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("userId", "==", userId));
    const productCardsContainer = document.getElementById('product-cards');

    onSnapshot(q, (querySnapshot) => {
        if (!productCardsContainer) return;
        let cardsHtml = '';
        if (querySnapshot.empty) {
            cardsHtml = `<div class="col-12"><p class="text-center text-muted">No products found. Click 'Add Product' to get started!</p></div>`;
        } else {
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                cardsHtml += `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card h-100 product-card">
                            <div class="card-header bg-transparent border-0">
                                <h5 class="card-title mb-0">${product.title}</h5>
                            </div>
                            <div class="card-body text-secondary">
                                <p class="card-text">${product.description}</p>
                            </div>
                            <div class="card-footer bg-transparent border-0 text-end">
                                <p class="card-text fs-5 fw-bold text-primary">$${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        productCardsContainer.innerHTML = cardsHtml;
    });
}