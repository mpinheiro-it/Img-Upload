import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: {value: true, message: "Arquivo Obrigatório"},
      validate: {
        lessThan10MB: v => { 
          if (parseInt(v.size) < 10){
            return "O arquivo deve ser menor que 10MB" 
          }
          return true
        }, 

        acceptedFormats: v => {
          const regex = new RegExp(
            /([a-zA-Z0-9\s_\\.\-():])+(.png|.jpeg|.gif)$/
          );
          if (!regex.test(v[0].type)) {
            return 'Somente são aceitos arquivos PNG, JPEG e GIF';
          }
          return true;
        },
        
        }
      },    
    title: {
      required: {value: true, message: "Arquivo Obrigatório"},
      min: {value: 2, message: "Mínimo de 2 caracteres"},
      max: {value: 10, message: "Máximo de 20 caracteres"},
     },
    description: {
      required: {value:"true", message:"Descrição obrigatória"}
      maxLength: {value:65, message:"Máximo de 65 caracteres"}
      },
    }
    
  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    {
      // TODO ONSUCCESS MUTATION
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}          
          {...register('file', formValidations.image)}
          error={errors.file}
        />

        <TextInput
          placeholder="Título da imagem..."          
          {...register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."          
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
