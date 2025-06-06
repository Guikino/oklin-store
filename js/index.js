import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

  // Menu Toggle (Seu código original, mantido)
  const menuToggle = document.querySelector('.header__menu-toggle');
  const navLinks = document.querySelector('.header__nav');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  


 //usuario
  const userId = localStorage.getItem("userId");
  
  async function dataUser(){
    const avatar = document.querySelector("#avatar")  
    if(userId){
        const dataUserAvatar = await axios.get(`http://localhost:8081/users/${userId}`)
        console.log(dataUserAvatar.data.id)
        avatar.src = dataUserAvatar.data.avatar
    }
  }
  dataUser()
  




  // Carousel Logic (Seu código original com a correção aplicada)
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  let autoScroll; // Mantido para o controle do intervalo

  // Função para criar card (Sua função original, mantida)
  function criarCard(tenis) {
    const card = document.createElement('div');
    card.className = 'highlight-card';
    const marca = tenis.brand || 'Marca Desconhecida';
    const modelo = tenis.make || 'Modelo Desconhecido';
  
    card.innerHTML = `
      <img src="${tenis.thumbnail}" alt="${tenis.shoeName}">
      <h3>${marca}</h3>
      <p>${modelo}</p>
    `;
    return card;
  }

  // >>> INÍCIO DA CORREÇÃO <<<
  // Criei esta função para conter a nova lógica de avançar
  function moveNext() {
    // Calcula se o carrossel está no final ou muito perto dele
    const isAtEnd = track.scrollLeft >= (track.scrollWidth - track.clientWidth - 1);

    if (isAtEnd) {
      // Se estiver no fim, volta para o início com animação suave
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Caso contrário, continua rolando normalmente
      track.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }
  
  function resetAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(moveNext, 3000); // Agora chama a nova função
  }
  
  function carregarTenisDestaque() {
    fetch('http://localhost:3000/api/sneakers/search?q=tenis&limit=15')
      .then(res => res.json())
      .then(data => {
        console.log('API retornou itens:', data.length); // Verifica quantos itens vieram
        track.innerHTML = '';
        data.slice(0, 15).filter(tenis => tenis.brand != "Louis Vuitton").forEach(tenis => {
          const card = criarCard(tenis);
          track.appendChild(card);
        });
        
        // Inicia o carrossel somente depois que os cards foram carregados
        // Adiciona um pequeno delay para o navegador calcular as larguras corretas
        setTimeout(() => {
          console.log('Track scrollWidth:', track.scrollWidth);
          console.log('Track clientWidth:', track.clientWidth);
        }, 100);
        resetAutoScroll(); 
      })
      .catch(err => console.error('Erro ao carregar tênis:', err));
  }




  // Carregamento inicial (Seu código original, mantido)
  carregarTenisDestaque();

  // Eventos dos botões (Atualizados para usar a nova lógica)
  nextBtn.addEventListener('click', () => {
    moveNext();
    resetAutoScroll();
  });

  prevBtn.addEventListener('click', () => {
    // A lógica original de voltar já funciona bem.
    track.scrollBy({ left: -320, behavior: 'smooth' });
    resetAutoScroll();
  });