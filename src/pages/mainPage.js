//IMPORTS
import { connect, autoConnectIfIsConnected } from "../redux/blockchain/blockchainActions";

// DESIGN
import { Card, Grid, /*list,*/ Divider } from '@nextui-org/react';
import { Container, Row/*, Col*/ } from '@nextui-org/react';
import { Text, Spacer, Button/*, Link*/ } from '@nextui-org/react';


export const NFTITEM = ({ data }) => {
    //{console.log(item)}
    //let item = data.item;
    let index = data.index;
    return (

        <Grid key={index}>
            <Card css={{ w: "330px" }}>
                <Card.Header>
                    <Text b>Card Title</Text>
                </Card.Header>
                <Divider />
                <Card.Body css={{ py: '$10' }}>
                    <Text>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </Text>
                </Card.Body>
                <Divider />
                <Card.Footer>
                    <Row justify="flex-end">
                        <Button size="sm" light>Cancel</Button>
                        <Button size="sm">Agree</Button>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>



    );
};
