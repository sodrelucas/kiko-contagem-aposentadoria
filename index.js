//Clientes

//Carregar tabela ao abrir a aplicação
document.addEventListener("DOMContentLoaded", function () {
  axios.get("http://localhost:3000/customers/").then((res) => {
    const dataCustomers = res.data.customers;
    //looping para pegar cada item em cada cliente
    for (i in dataCustomers) {
      //Pegando todos os elementos da tabela
      const tableBody = document.querySelector("#tableBody");
      const tableRow = document.createElement("tr");
      const tableClt = document.createElement("th");
      const tableAdv = document.createElement("th");
      const tableFase = document.createElement("th");
      const tableDesc = document.createElement("th");
      const tableBtn = document.createElement("th");

      //Adicionando estilização via bootstrap
      tableBtn.className = "d-flex justify-content-around";

      let btnDel = document.createElement("img");
      btnDel.className = "btn delBtn";
      btnDel.src = "../assets/icons/trash.svg";
      btnDel.setAttribute("onClick", `delCustomer(${dataCustomers[i].id})`);

      //Atribuindo os botões a tag pai
      tableBtn.append(btnDel);

      tableClt.innerText = dataCustomers[i].nome;
      tableAdv.innerText = dataCustomers[i].adv;
      tableFase.innerText = dataCustomers[i].fase;
      tableDesc.innerText = dataCustomers[i].desc;

      tableRow.appendChild(tableClt);
      tableRow.appendChild(tableAdv);
      tableRow.appendChild(tableFase);
      tableRow.appendChild(tableDesc);
      tableRow.appendChild(tableBtn);

      tableBody.appendChild(tableRow);
    }
  });
});

//Procurar clientes por CPF
async function searchCustomers() {
  const scpf = document.querySelector("#sCpf").value;
  const cpf = Number(scpf);

  axios.get(`http://localhost:3000/customers/`).then((res) => {
    const customers = res.data.customers;
    console.log(customers);

    const customersFound = customers.filter((customer) => customer.cpf === cpf);
    console.log(customersFound);

    // Limpar conteúdo da tabela antes de adicionar os novos resultados
    const tableBody = document.querySelector("#tableBodyFound");
    tableBody.innerHTML = "";

    for (i in customersFound) {
      //Pegando todos os elementos da tabela
      const tableRow = document.createElement("tr");
      const tableClt = document.createElement("th");
      const tableAdv = document.createElement("th");
      const tableFase = document.createElement("th");
      const tableDesc = document.createElement("th");
      const tableBtn = document.createElement("th");

      //Adicionando estilização via bootstrap
      tableBtn.className = "d-flex justify-content-around";

      let btnDel = document.createElement("img");
      btnDel.className = "btn delBtn";
      btnDel.src = "../assets/icons/trash.svg";
      btnDel.setAttribute("onClick", `delCustomer(${customersFound[i].id})`);

      //Atribuindo os botões a tag pai
      tableBtn.append(btnDel);

      tableClt.innerText = customersFound[i].nome;
      tableAdv.innerText = customersFound[i].adv;
      tableFase.innerText = customersFound[i].fase;
      tableDesc.innerText = customersFound[i].desc;

      tableRow.appendChild(tableClt);
      tableRow.appendChild(tableAdv);
      tableRow.appendChild(tableFase);
      tableRow.appendChild(tableDesc);
      tableRow.appendChild(tableBtn);
      tableBody.appendChild(tableRow);
    }
  });
}

//Adicionar Cliente
function addCustomer() {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const adv = document.getElementById("adv").value;
  const fase = document.getElementById("fase").value;
  const desc = document.getElementById("desc").value;

  console.log(nome + cpf + adv + fase + desc);

  axios
    .post("http://localhost:3000/customers/", {
      nome,
      cpf,
      adv,
      fase,
      desc,
    })
    .then((response) => {
      console.log(response.data);
      alert("Dados adicionados com sucesso");
    })
    .catch((err) => {
      console.log(err);
      alert("Erro ao adicionar dados");
    });

  location.reload(true);
}

//Deletar cliente
function delCustomer(customerId) {
  // Faz a requisição de delete
  axios
    .delete(`http://localhost:3000/customers/${customerId}`)
    .then((response) => {
      console.log(response.data);
      alert("Cliente excluído com sucesso");
    })
    .catch((err) => {
      console.log(err);
      alert("Erro ao excluir cliente");
    });
  location.reload(true);
}

//Reuniões

//Carregar reuniões
function loadMeetings() {
  axios.get("http://localhost:3000/meetings/").then((res) => {
    const dataMeetings = res.data.meetings;


    const meetingList = document.querySelector("#tablemeeting");
    meetingList.innerHTML = ""
    //looping para pegar cada item em cada cliente
    for (i in dataMeetings) {
      //Pegando todos os elementos da tabela
      
      const tableRow = document.createElement("tr");
      const tableClt = document.createElement("th");
      const tablehour = document.createElement("th");
      const tabledata = document.createElement("th");
      const tableBtn = document.createElement("th");

      let btnDel = document.createElement("img");
      btnDel.className = "btn delBtn";
      btnDel.src = "../assets/icons/trash.svg";
      btnDel.setAttribute("onClick", `delmeeting(${dataMeetings[i].id})`);

      //Atribuindo os botões a tag pai
      tableBtn.append(btnDel);

      tableClt.innerText = dataMeetings[i].nome;
      tablehour.innerText = dataMeetings[i].hora;
      tabledata.innerText = dataMeetings[i].data;

      tableRow.appendChild(tableClt);
      tableRow.appendChild(tablehour);
      tableRow.appendChild(tabledata);
      tableRow.appendChild(tableBtn);

      meetingList.appendChild(tableRow);
    }
  });
}

//Adicionar Reuniões
function addmeeting() {
  const nome = document.getElementById("mName").value;
  const hora = document.getElementById("hora").value;
  const data = document.getElementById("data").value;

  console.log(nome + hora + data);

  axios
    .post("http://localhost:3000/meetings/", {
      nome,
      hora,
      data,
    })
    .then((response) => {
      console.log(response.data);
      alert("Reunião adicionada com sucesso");
    })
    .catch((err) => {
      console.log(err);
      alert("Erro ao adicionar reunião");
    });

  location.reload(true);
}

//Deletar reunião
function delmeeting(meetingId) {
  // Faz a requisição de delete
  axios
    .delete(`http://localhost:3000/meetings/${meetingId}`)
    .then((response) => {
      console.log(response.data);
      alert("Reunião excluída com sucesso");
    })
    .catch((err) => {
      console.log(err);
      alert("Erro ao excluir reunião");
    });
  location.reload(true);
}
