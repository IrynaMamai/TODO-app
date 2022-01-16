import { Divider, Icon, Layout, List, ListItem } from "@ui-kitten/components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControllerInput } from "../commonComponents";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../../App";
import { ITODOList } from "../../redux/types";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IRenderLists {
    lists: ITODOList[]
    navigation: NativeStackNavigationProp<RootStackParamList, "Items">
}
const SearchingAndRenderLists: React.FC<IRenderLists> = ({ lists, navigation }) => {
    const schema = yup.object({ search: yup.string().default('') })
    const { control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [foundLists, setFoundLists] = useState<ITODOList[]>(lists);

    useEffect(() => {
        console.log('SearchingAndRenderLists');
    }, []);

    const searching = (value: string | undefined) => {
        console.log('searching');

        const keyword = value;
        if (keyword == undefined) return;

        const results = lists.filter((list: ITODOList) => {
            return list.nameList.toLowerCase().includes(keyword.toLowerCase());
        });
        setFoundLists(results);
    };

    return (
        <Layout>
            <ControllerInput
                control={control}
                errors={errors.search}
                nameController={"search"}
                placeholder={"search list"}
                isDate={false}
                onChangeCustom={searching}
            />

            <RenderLists lists={foundLists} navigation={navigation} />
        </Layout>
    );
}


const RenderLists: React.FC<IRenderLists> = React.memo(function RenderLists({ lists, navigation }) {
    useEffect(() => {
        console.log('RenderLists');
    }, []);

    const renderList = (list: any) => {
        console.log('renderList');

        return (
            <ListItem
                style={{ margin: 1 }}
                title={`${list.item.nameList}`}
                description={`Count items: ${list.item.TODOItems?.length}`}
                onPress={() => onPressList(list.item)}
                accessoryRight={<Icon name='arrow-ios-forward-outline' />}
            />
        )
    }

    const onPressList = (list: ITODOList) => {
        console.log('onPressList');
        navigation.navigate("Items", list);
    }

    return (
        <Layout level='2' style={{ height: '85%', marginLeft: 10, marginRight: 5 }}>
            <List
                data={lists}
                ItemSeparatorComponent={Divider}
                renderItem={renderList}
            />
        </Layout>
    )
})

export const MemoizedSearchingAndRenderLists = React.memo(SearchingAndRenderLists)