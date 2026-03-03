import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FormField from '../FormField';
import { setContato } from '../../store/slices/contatoSlice';
import { mudarForm } from '../../store/slices/uiSlice';

const FormContato = () => {
  const dispatch = useDispatch();
  const contato = useSelector((state) => state.contato);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setContato({ [name]: value }));
  };

  return (
    <>
      <h2>Informações de contato</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormField
          id='nome'
          label='Nome completo:'
          atributos={{ type: 'text', required: true, minLength: 3, name: 'nome' }}
          iptValue={contato.nome}
          iptChange={handleInputChange}
        />
        <FormField
          id='celular'
          label='Celular:'
          atributos={{ type: 'tel', minLength: 11, maxLength: 11, name: 'telefone' }}
          iptValue={contato.telefone}
          iptChange={handleInputChange}
        />
        <FormField
          id='email'
          label='Email:'
          atributos={{ type: 'email', name: 'email' }}
          iptValue={contato.email}
          iptChange={handleInputChange}
        />
        <FormField
          id='linkedin'
          label='Linkedin:'
          atributos={{ type: 'text', name: 'linkedin' }}
          iptValue={contato.linkedin}
          iptChange={handleInputChange}
        />
        <button type='submit' onClick={() => dispatch(mudarForm('objetivo'))}>
          <FontAwesomeIcon icon={faArrowRight} alt='Seta para a direita' title='Próximo' />
        </button>
      </form>
    </>
  );
};

export default FormContato;
