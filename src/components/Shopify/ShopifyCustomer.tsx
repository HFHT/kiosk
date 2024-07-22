import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Flex, Checkbox, Grid, Container, Divider, Textarea, Group } from '@mantine/core';
import { GoogleAddressAutoComplete, predictionType } from '../../Google';
import { useState } from 'react';
import { isEmail } from '../../helpers';
import { useOpenAI } from '../../hooks';
import { isZip, stringOrBlank } from '../../helpers';

const CONST_GPT_PROMPT = 'Parse this information into a list of items and quantities: {items}. Your response should be in the following JSON format: [  {    "prod": "Item 1", "qty": "Quantity 1"  }]'

interface ShopifyCustomerInterface {
    customer: ShopifyCustomerT | undefined
    reset: Function
}
export function ShopifyCustomer({ customer, reset }: ShopifyCustomerInterface) {
    const [place, setPlace] = useState<predictionType>()
    const [donationInput, setDonationInput] = useState('')
    const [itemList, getGPT, noResponse, resetGPT]: any = useOpenAI()
    const analyze = () => {
        getGPT(CONST_GPT_PROMPT.replace(/{items}/g, donationInput))
    }
    const initialValues = {
        firstName: stringOrBlank(customer?.first_name),
        lastName: stringOrBlank(customer?.last_name),
        donations: '',
        email: stringOrBlank(customer?.email),
        zip: stringOrBlank(customer?.default_address?.zip),
        address: stringOrBlank(customer?.default_address?.address1),
        newsletter: false,
        emailReceipt: false
    }
    const canSubmit = () => {
        return true
    }
    const canStartOver = () => {
        return true
    }
    const haveEmail = (nl: boolean, em: string) => {
        if (nl) return !isEmail(em)
        return false
    }
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: initialValues,
        validate: {
            firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
            donations: (value) => (value.length < 5 ? 'Donation must have at least 5 characters' : null),
            email: (value) => ((value === '' || isEmail(value)) ? null : 'Invalid email'),
            newsletter: (value, values) => ((value && !isEmail(values.email)) ? 'Email required' : null),
            emailReceipt: (value, values) => ((value && !isEmail(values.email)) ? 'Email required' : null),
            zip: (value) => (isZip(value) ? 'Zip must have 5 characters' : null),
        },
    })

    return (
        <div className='pad-above-md'>
            <Divider className='pad-below' />
            <form onSubmit={form.onSubmit((values) => console.log(values))} className=''>
                <Group grow justify="flex-end" >
                    <Button type="submit" mt="lg" size='lg'>&nbsp;&nbsp;Done&nbsp;&nbsp;</Button>
                    <Button onClick={() => { form.clearErrors(); form.initialize(initialValues); reset() }} mt="lg" size='lg'>Start Over</Button>
                </Group>
                <Grid grow justify="space-between" align="center" className='pad-above-md'>
                    <Grid.Col span={4}>
                        <TextInput
                            label="First Name"
                            placeholder="First Name..."
                            size='lg'
                            withAsterisk
                            key={form.key('firstName')}
                            {...form.getInputProps('firstName')}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <TextInput
                            label="Last Name"
                            placeholder="Last Name..."
                            size='lg'
                            withAsterisk
                            key={form.key('lastName')}
                            {...form.getInputProps('lastName')}
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <TextInput
                            label="Zipcode"
                            size='lg'
                            placeholder="#####"
                            withAsterisk
                            key={form.key('zip')}
                            {...form.getInputProps('zip')}
                        />
                    </Grid.Col>
                </Grid>
                <Textarea className='pad-above'
                    key={form.key('donations')}
                    {...form.getInputProps('donations')}
                    size="lg"
                    label="Donation"
                    withAsterisk
                    autosize
                    minRows={5}
                    description="Enter a list of items and quantities that you are donating."
                    placeholder="1 table, 4 chairs..."
                />
                <Grid grow justify="space-between" align="center">
                    <Grid.Col span={6}>
                        <TextInput
                            mt="sm"
                            label="Email"
                            size='lg'
                            placeholder="Email"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Checkbox
                            label="Sign up for our newsletter?"
                            size="md"
                            key={form.key('newsletter')}
                            {...form.getInputProps('newsletter')}
                        />
                        <Checkbox
                            label="Email receipt?"
                            size="md"
                            key={form.key('emailReceipt')}
                            {...form.getInputProps('emailReceipt')}
                        />
                    </Grid.Col>
                </Grid>
                <GoogleAddressAutoComplete address={customer?.formatted_address} setPlace={(p: any) => setPlace(p)} />
            </form>
        </div>
    )
}
