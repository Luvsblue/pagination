document.addEventListener('DOMContentLoaded', function () {
   
    fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
        .then(response => response.json())
        .then(jsonData => {
            const itemsPerPage = 5;
            const totalPages = Math.ceil(jsonData.length / itemsPerPage);

            function showPage(pageNumber) {
                const startIndex = (pageNumber - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentPageData = jsonData.slice(startIndex, endIndex);

                const dataContainer = document.getElementById('data-container');
                dataContainer.innerHTML = ''; 

                const unorderedList = document.createElement('ul');

                currentPageData.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = "ID: " + item.id + ", Name: " + item.name + ", Email: " + item.email;
                    unorderedList.appendChild(listItem);
                });

                dataContainer.appendChild(unorderedList);
            }

            function createPaginationButtons() {
                const paginationContainer = document.getElementById('pagination-container');
                const paginationList = document.createElement('ul');
                paginationList.classList.add('pagination');

                for (let i = 1; i <= totalPages; i++) {
                    const paginationItem = document.createElement('li');
                    const paginationLink = document.createElement('a');
                    paginationLink.href = '#';
                    paginationLink.textContent = i;

                    paginationLink.addEventListener('click', function (event) {
                        event.preventDefault();
                        showPage(i);
                    });

                    paginationItem.appendChild(paginationLink);
                    paginationList.appendChild(paginationItem);
                }

                paginationContainer.appendChild(paginationList);
            }

            
            showPage(1);
            createPaginationButtons();
        })
        .catch(error => console.error('Error fetching data:', error));
});