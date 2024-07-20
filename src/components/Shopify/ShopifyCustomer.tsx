import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';
export function ShopifyCustomer() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { name: '', email: '', age: 0 },

        // functions will be used to validate values at corresponding key
        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
        },
    })

    return (
        <>
            <TextInput
                label="Name"
                placeholder="Name"
                withAsterisk
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <TextInput
                mt="sm"
                label="Email"
                placeholder="Email"
                withAsterisk
                key={form.key('email')}
                {...form.getInputProps('email')}
            />
            <NumberInput
                mt="sm"
                label="Age"
                placeholder="Age"
                min={0}
                max={99}
                key={form.key('age')}
                {...form.getInputProps('age')}
            />
            <Button type="submit" mt="lg" size='lg'>
                Done
            </Button>
        </>
    )
}
