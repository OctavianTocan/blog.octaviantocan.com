import * as params from '@params';

let fuse;
let allData = [];
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let sectionFilter = document.getElementById('section-filter');
let tagFilter = document.getElementById('tag-filter');

let first, last, current_elem = null;
let resultsAvailable = false;

window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                allData = JSON.parse(xhr.responseText);
                if (allData) {
                    let options = {
                        distance: 100,
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: ['title', 'permalink', 'summary', 'content']
                    };
                    if (params.fuseOpts) {
                        options = { ...options, ...params.fuseOpts };
                    }
                    fuse = new Fuse(allData, options);
                    if (sInput.value) {
                        executeSearch();
                    }
                }
            } else {
                console.error(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "../index.json");
    xhr.send();
};

function executeSearch() {
    if (!fuse) return;

    let searchTerm = sInput.value.trim();
    let selectedSection = sectionFilter.value;
    let selectedTag = tagFilter.value;

    let filteredData = allData;

    if (selectedSection) {
        filteredData = filteredData.filter(item => item.section === selectedSection);
    }

    if (selectedTag) {
        filteredData = filteredData.filter(item => item.tags && item.tags.includes(selectedTag));
    }

    fuse.setCollection(filteredData);

    let results;
    if (searchTerm) {
        results = fuse.search(searchTerm, { limit: params.fuseOpts?.limit });
    } else {
        results = filteredData.map(item => ({ item: item }));
    }

    if (results.length > 0) {
        let resultSet = '';
        results.forEach(({ item }) => {
            resultSet += `<li class="post-entry"><header class="entry-header">${item.title}&nbsp;»</header>` +
                `<a href="${item.permalink}" aria-label="${item.title}"></a></li>`;
        });
        resList.innerHTML = resultSet;
        resultsAvailable = true;
        first = resList.firstChild;
        last = resList.lastChild;
    } else {
        resultsAvailable = false;
        resList.innerHTML = '<li class="no-results">No results found</li>';
    }
}

if (sInput) {
    sInput.onkeyup = executeSearch;
    sectionFilter.onchange = executeSearch;
    tagFilter.onchange = executeSearch;

    sInput.addEventListener('search', function (e) {
        if (!this.value) {
            sInput.value = '';
            executeSearch();
        }
    });
}


function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(function (element) {
        element.classList.remove("focus")
    });
    if (ae) {
        ae.focus()
        document.activeElement = current_elem = ae;
        ae.parentElement.classList.add("focus")
    } else {
        document.activeElement.parentElement.classList.add("focus")
    }
}

document.onkeydown = function (e) {
    if (!sInput) return;

    let key = e.key;
    let ae = document.activeElement;

    let inbox = document.getElementById("searchbox").contains(ae)

    if (ae === sInput) {
        let elements = document.getElementsByClassName('focus');
        while (elements.length > 0) {
            elements[0].classList.remove('focus');
        }
    } else if (current_elem) ae = current_elem;

    if (key === "Escape") {
        sInput.value = '';
        sectionFilter.value = '';
        tagFilter.value = '';
        executeSearch();
        sInput.focus();
    } else if (!resultsAvailable || !inbox) {
        return
    } else if (key === "ArrowDown") {
        e.preventDefault();
        if (ae == sInput) {
            activeToggle(resList.firstChild.lastChild);
        } else if (ae.parentElement != last) {
            activeToggle(ae.parentElement.nextSibling.lastChild);
        }
    } else if (key === "ArrowUp") {
        e.preventDefault();
        if (ae.parentElement == first) {
            activeToggle(sInput);
        } else if (ae != sInput) {
            activeToggle(ae.parentElement.previousSibling.lastChild);
        }
    } else if (key === "ArrowRight") {
        ae.click();
    }
}
