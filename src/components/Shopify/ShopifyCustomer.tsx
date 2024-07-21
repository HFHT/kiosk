import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Flex } from '@mantine/core';
import { GoogleAddressAutoComplete, predictionType } from '../../Google';
import { useState } from 'react';
import { isEmail } from '../../helpers';
interface ShopifyCustomerInterface {
    customer: ShopifyCustomerT | undefined
}
export function ShopifyCustomer({customer}:ShopifyCustomerInterface) {
    const [place, setPlace] = useState<predictionType>()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { firstName: '', lastName: '', email: '', zip: '', address: '' },
        validate: {
            firstName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (isEmail(value) ? null : 'Invalid email'),
            zip: (value) => (value.length != 5 ? 'Zip must have 5 characters' : null),
        },
    })

    return (
        <>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    label="First Name"
                    placeholder="First Name..."
                    size='lg'
                    withAsterisk
                    key={form.key('firstName')}
                    {...form.getInputProps('firstName')}
                />
                <TextInput
                    label="Last Name"
                    placeholder="Last Name..."
                    size='lg'
                    withAsterisk
                    key={form.key('lastName')}
                    {...form.getInputProps('lastName')}
                />
                <TextInput
                    mt="sm"
                    label="Zipcode"
                    size='lg'
                    placeholder="#####"
                    withAsterisk
                    key={form.key('zip')}
                    {...form.getInputProps('zip')}
                />
                <TextInput
                    mt="sm"
                    label="Email"
                    size='lg'
                    placeholder="Email"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <GoogleAddressAutoComplete setPlace={(p: any) => setPlace(p)} />

                <Button type="submit" mt="lg" size='lg'>
                    Done
                </Button>
                <p>Progressive, only open this when a phone is entered.</p>
                <p>Name, zip are required. Ideally email and signup for newsletter. </p>
            </form>
        </>
    )
}
