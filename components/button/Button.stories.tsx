import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Button } from './'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: () => {
    return (
      <View className="p-4">
        <Button variant="outline">Button</Button>
      </View>
    )
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
  },
}
