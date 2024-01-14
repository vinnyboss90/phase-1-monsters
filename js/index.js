document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const monsterForm = document.getElementById("monster-form");
    const backBtn = document.getElementById("back");
    const forwardBtn = document.getElementById("forward");
    let currentPage = 1;
  
    // Function to fetch monsters and display them
    function fetchMonsters(page) {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then((res) => res.json())
        .then((monsters) => {
          monsterContainer.innerHTML = "";
          monsters.forEach((monster) => {
            displayMonster(monster);
          });
        });
        
    }
  
    // Function to create and display a single monster
    function displayMonster(monster) {
      const monsterCard = document.createElement("div");
      monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterCard);
   
    }
  
    // Event listener for form submission to create a new monster
    monsterForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
  
      if (name && age && description) {
        // Create a new monster object
        const newMonster = {
          name,
          age: parseInt(age),
          description,
        };
  
        // POST request to add the new monster to the API
        fetch("http://localhost:3000/monsters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMonster),
        })
          .then(() => {
            // Clear form fields
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("description").value = "";
  
            // Refresh the monster list to include the new monster
            fetchMonsters(currentPage);
          })
         
      }
    });
  
    // Event listener for "Back" button
    backBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMonsters(currentPage);
      }
    });
  
    // Event listener for "Forward" button
    forwardBtn.addEventListener("click", () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  
    // Initial fetch to load the first page of monsters
    fetchMonsters(currentPage);
  });
  