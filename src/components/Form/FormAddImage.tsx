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

interface SaveResponse {
  success: boolean;
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
      required: {value:true, message:"Descrição obrigatória"},
      maxLength: {value:65, message:"Máximo de 65 caracteres"}
      },
    }

  async function saveData(params: Record<string, unknown>): Promise<SaveResponse> {
      const { data } = await api.post<SaveResponse>('/api/images', {
        title: params.title,
        description: params.description,
        url: imageUrl,
      });
  
      return data;
    }
    
  const queryClient = useQueryClient();
  const mutation = useMutation(
    saveData,
    {
      onSuccess: data => {
        queryClient.invalidateQueries(['images']);
      }
    },
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
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'error',
        })
      }
      
      await mutation.mutateAsync(data);

      toast({
        title: 'Imagem cadastrada',
        description:
                "Sua imagem foi cadastrada com sucesso.",
        status: 'success',
      })

      reset({
        image: '',
        title: '',
        description: '',
      });

    } catch {
      toast({
        title: 'Falha no cadastro',
        description:
                "Ocorreu um erro ao tentar cadastrar a sua imagem.",
        status: 'error',
      })
    } finally {
      closeModal()
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
          {...register('image', formValidations.image)}
          error={errors.image}
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
