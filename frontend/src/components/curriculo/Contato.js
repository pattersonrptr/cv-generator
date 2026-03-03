import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../../styles/curriculo/Contato.css';

const Contato = () => {
  const contato = useSelector((state) => state.contato);
  const { nome, telefone, linkedin, email } = contato;

  const formatarCelular = (numero) => {
    const digitos = numero.split('');
    let novoNumero = '(';
    novoNumero += `${digitos[0]}${digitos[1]}) `;
    novoNumero += `${digitos[2]} `;
    for (let i = 3; i < 11; i++) novoNumero += digitos[i];
    return novoNumero;
  };

  const celularFormatado = telefone && telefone.length >= 11 ? formatarCelular(telefone) : telefone;

  return (
    <div className='contato'>
      <h2>{nome}</h2>
      {email && <p><FontAwesomeIcon icon={faAt} />{email}</p>}
      {telefone && <p><FontAwesomeIcon icon={faPhone} />{celularFormatado}</p>}
      {linkedin && <p><FontAwesomeIcon icon={faLinkedin} />{linkedin}</p>}
    </div>
  );
};

export default Contato;
