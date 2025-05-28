// // Question
// Level ->>> Hard
// Asked in Salesforce, powerplay


// How can we efficiently implement a typeahead cache system with LRU (Least Recently Used)
// eviction to store and retrieve search suggestions?


// class TypeAheadCache {
//     constructor(capacity) {}

//     async fetchSuggestions(query) {
// 	    // Fetch reuslt from getSuggestionsFromAPI
//     }

//     async getSuggestionsFromAPI(query) {
//         // mock server
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(query);
//             }, 500);
//         });
//     }
// }

// // Test
// const typeAhead = new TypeAheadCache(2); // Limit cache to 2 items

// async function testTypeAhead() {
// //      await typeAhead.fetchSuggestions('apple');  // Fetch from API
//     await typeAhead.fetchSuggestions('banana'); // Fetch from API
//     await typeAhead.fetchSuggestions('apple');  // Cache hit
//     await typeAhead.fetchSuggestions('cherry'); // Fetch from API
//     await typeAhead.fetchSuggestions('banana'); // Fetch from API
//     await typeAhead.fetchSuggestions('date');   // Fetch from API
//     await typeAhead.fetchSuggestions('apple');  //  Fetch from API
//     await typeAhead.fetchSuggestions('date');  //  Cache hit
// }

// testTypeAhead();





// Solution 
// Reference - https://leetcode.com/problems/lru-cache

class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        
        // Move the accessed key to the end to mark it as recently used
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // If the cache exceeds capacity, remove the first entry
        if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }

        // Insert item at end
        this.cache.set(key, value);
    }
}

class TypeAheadCache {
    constructor(capacity) {
        this.cache = new LRUCache(capacity);
    }

    async fetchSuggestions(query) {
        // Check if query exists in cache
        const cachedResult = this.cache.get(query);
        if (cachedResult !== -1) {
            console.log('Cache hit for:', query);
            console.log(this.cache.cache.keys());
            console.log("-------------------------------"); 
            return cachedResult;
        }

        // Simulate an API call or database search for the suggestions
        console.log('Fetching from API for:', query);
        const results = await this.getSuggestionsFromAPI(query);

        // Cache the result
        this.cache.put(query, results);
        console.log(this.cache.cache.keys());
        console.log("-------------------------------");

        return results;
    }

    async getSuggestionsFromAPI(query) {
        // Simulate a delay and return some dummy suggestions
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(query);
            }, 500);
        });
    }
}