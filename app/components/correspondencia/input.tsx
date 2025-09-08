
import {api} from "../../components/uteis/api"

const handleSubmit = async (e) => {
  e.preventDefault();

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  if (!emailValido) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  try {
    const [dia, mes, ano] = form.data.split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    const payload = {
      tipo: form.tipo,
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      data: dataFormatada
    };

    const res = await api.post('/api/correspondencia', payload);

    if (res.status === 200 || res.status === 201) {
      alert('Correspondência cadastrada com sucesso!');
      setForm({ tipo: 'Recebida', nome: '', email: '', telefone: '', data: '' });
    } else {
      alert('Erro ao cadastrar correspondência.');
    }
  } catch (error) {
    console.error(error);
    alert('Erro na requisição.');
  }
};
