import { BottomNavigation, BottomNavigationTab, Button, Divider, Icon, Layout, List, ListItem, Text } from "@ui-kitten/components";
import { deleteItemRequest, updateStatusItemRequest } from "../../redux/actions";
import React, { useEffect, useState } from "react";
import { ITODOItem } from "../../redux/types";
import { StyleSheet } from 'react-native';
import { useDispatch } from "react-redux";


interface IRenderItems {
    items: ITODOItem[]
}

const RenderItems: React.FC<IRenderItems> = ({ items }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        console.log('RenderItems');
    }, []);

    const renderItem = (item: any) => {
        console.log('renderItem');

        return (
            <RenderItem item={item.item} />
        )
    }

    return (
        <Layout style={styles.itemsContainer}>
            <BottomNavigation
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <BottomNavigationTab title='All' />
                <BottomNavigationTab title='In progress' />
                <BottomNavigationTab title='Done' />
            </BottomNavigation>
            <Divider />
            {selectedIndex == 0 &&
                <List
                    data={items}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
            }

            {selectedIndex == 1 &&
                <List
                    data={items.filter((item: ITODOItem) => !item.isDone)}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
            }

            {selectedIndex == 2 &&
                <List
                    data={items.filter((item: ITODOItem) => item.isDone)}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
            }

        </Layout>
    )
}



interface IRenderItem {
    item: ITODOItem
}

const RenderItem: React.FC<IRenderItem> = React.memo(function ({ item }) {
    const [visible, setVisible] = React.useState<boolean>(false);

    return (
        <ListItem
            style={{ margin: 1 }}
            title={`${item.title}`}
            description={renderDescriptionItem(item, visible)}
            onPress={() => setVisible(!visible)}
            accessoryRight={<Icon name={visible ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} />}
        />
    )
})


const renderDescriptionItem = (item: ITODOItem, visible: boolean) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('renderDescriptionItem');
    }, []);

    const deleteItem = (item: ITODOItem) => {
        console.log('deleteItem');
        dispatch(deleteItemRequest(item));
    }

    const updateSatusItem = (item: ITODOItem) => {
        console.log('updateSatusItem');
        const Item: ITODOItem = { ...item, isDone: !item.isDone }
        dispatch(updateStatusItemRequest(Item));
    }
    const parseDeadline = (deadline: Date | undefined) => {
        console.log('parseDeadline');
        
        if (deadline == undefined) return "no deadline set";

        const date = new Date(deadline);
        return date.getDate() + '/' + ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear()
    }
    return (
        <>
            {visible &&
                <Layout style={{ margin: 8 }}>
                    <Layout style={{ flexDirection: 'column' }}>
                        <Text style={styles.textDescription}>{item?.description}</Text>
                        <Text style={styles.textDescription}>
                            {'deadline: ' + parseDeadline(item?.deadline)}
                        </Text>
                    </Layout>

                    <Layout style={{ flexDirection: 'row' }}>
                        <Button style={styles.buttonTiny}
                            onPress={() => updateSatusItem(item)}
                            size='tiny' appearance='outline'
                            status={item?.isDone ? 'success' : 'primary'}>
                            {(item?.isDone ? 'Done' : 'In progress')}
                        </Button>
                        <Button style={styles.buttonTiny}
                            onPress={() => deleteItem(item)}
                            size='tiny'
                            appearance='outline'
                            status='danger'>
                            DELETE
                        </Button>
                    </Layout>

                </Layout>
            }
        </>
    )
}


const styles = StyleSheet.create({
    buttonTiny: {
        margin: 5,
    },
    itemsContainer: {
        height: '87%',
        marginLeft: 10,
        marginRight: 5
    },
    textDescription: {
        fontSize: 12,
        color: 'grey',
        margin: 5
    }
});

export const MemoizedRenderItems = React.memo(RenderItems);