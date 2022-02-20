import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { createRickRollSchema } from '../lib/schemas'

export default function NewRickRoll({ user }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(createRickRollSchema)
    })

    return (
        <Layout page="otherpage">
            <h1>Create a RickRoll!</h1>
            {user}
        </Layout>
    )
}

OtherPage.auth = true