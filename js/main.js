const baseUrl = 'https://geo.api.gouv.fr';
const selecRegion = document.querySelector(`#regions`);
const selecDepartement = document.querySelector(`#departements`);

fetch(`${baseUrl}/regions`).then(response => response.json()).then(regions => {
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region.code;
            option.textContent = region.nom; 
            selecRegion.appendChild(option);
        });
    })

selecRegion.addEventListener('change', (e) => {
    const codeRegion = e.target.value;
    fetch(`${baseUrl}/regions/${codeRegion}/departements`).then(response => response.json()).then(departements => {
            selecDepartement.innerHTML = '<option value="">Choisissez un département</option>';
            
            departements.forEach(departement => {
                const option = document.createElement('option');
                option.value = departement.code;
                option.textContent = departement.nom;
                selecDepartement.appendChild(option);
            });
        })
});

const boutonAfficher = document.querySelector('button');

boutonAfficher.addEventListener('click', () => {
    const codeDepartement = selecDepartement.value;

    if (!codeDepartement) {
        alert("Veuillez sélectionner un département.");
        return;
    }

    fetch(`${baseUrl}/departements/${codeDepartement}/communes`).then(response => response.json()).then(communes => {
            communes.sort((a, b) => b.population - a.population);

            const communeList = document.createElement('ul');
            communes.forEach(commune => {
                const li = document.createElement('li');
                li.textContent = `${commune.nom} - ${commune.population} habitants`;
                communeList.appendChild(li);
            });

            document.body.appendChild(communeList);
        })
});
