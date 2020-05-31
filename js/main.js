/*
Vue.component('detail', {
    props: {
        details: {

        }
    }
})
*/
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    `
        <div class="product">
        <div class="product-image">
            <img :src="image" :alt="alt">
        </div>
        <div class="product-info">
            
            <span v-if="onSale">On Sale!</span>
            <h1>{{ title }}</h1>
            <h2>{{ description }}</h2>
            
            <h2>Details</h2>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <h2>Sizes</h2>
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>
            
            <div v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>
            
            <p v-if="inventory > 3">In stock - {{ inventory }}</p>
            
            <p v-else-if="inventory <= 3 && inventory >= 1">Almost sold out - {{ inventory }}</p>
            
            <p v-else-if="inventory == 0" 
            :class="{ stock: inventory==0 }">Out of stock - {{ inventory }}</p>
            
            <p>Shipping: {{shipping}} </p>
            
            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: inventory==0 }">Add to cart</button>
            
            <button v-on:click="decrementCart" 
                    :disabled="cart <= 0"
                    :class="{ disabledButton: cart <= 0 }">Remove to cart</button>
        </div>
        </div>
    `,
        data(){
            return {
                brand: "Vue Socks",
                product: "Socks", 
                description: "Are amazing!",
                selectedVariant: 0,
                alt: 'Product image',
                inventory: 4,
                onSale: false,
                sizes: ["9-11", "10-12", "11-13", "12-14"],
                details: ["Black", "80% cotton", "20% polyester"],
                variants:[
                    {
                        variantId: 1,
                        variantColor: 'black',
                        variantImage: 'images/socksBlack.png',
                        variantQuantity: 10
                    },
                    {
                        variantId: 2,
                        variantColor: 'white',
                        variantImage: 'images/socksWhite.png',
                        variantQuantity: 0
                    }
                ]
            }
            

        },
        methods:{
            addToCart() {
                this.$emit('add-to-cart', this.variants[selectedVariant].variantId)
            },
    
            updateProduct(index){
                this.selectedVariant = index
            }, 
    
            decrementCart(){
                if(this.cart > 0){
                    this.inventory += 1,
                    this.cart -= 1
                }
            }
        },
        computed:{
            title(){
                return this.brand + ' - ' + this.product
            }, 
    
            image(){
                return this.variants[this.selectedVariant].variantImage
            }, 
    
            inStock(){
                return this.variants[this.selectedVariant].variantQuantity
            },

            shipping(){
                if(this.premium) {
                    return "Free"
                }
                return "2.99"
            }
        }
})

var app = new Vue({
    el: '#app',

    data: {
        premium: false,
        cart: []
    },

    methods: {
        updateCart(id){
            this.cart.push(id)
        }
    }
})