import { Flex, Text, Button } from '@radix-ui/themes';

function Playground() {
    return (
        <div>
            <div>
                <h1 className="text-3xl">Playground</h1>
                <p>Let's draw some geometric figures!</p>
            </div>
            <div>
                <Flex direction="column" gap="2">
                    <Text>Hello from Radix Themes</Text>
                    <Button>Let's go</Button>
                </Flex>
            </div>
        </div>
    )
}

export default Playground