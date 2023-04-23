// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Cupons } from '../data/models/Cupons';

import IdParameter from '../data/services/Urls';
import serviceCupons from '../data/services/Cupons';
import fetchConteudoCupom from '../fetchConteudoCupom';
import processInfoCupom from '../processInfoCupom';
import { SeparatorItem } from './SeparatorItem';
import { UrlHeader } from './UrlsHeader';
import { Cupons2 } from '../data/models/Cupons2';



type diaSemanaCupom = {
  name: string
  // value: string
  value: number
  peso: number
}
type diaSemanaCupomNumber = {
  index: number
  value: number
}

export const CuponsList = () => {
  const [list, setList] = useState<Cupons[]>([]);
  const [list2, setList2] = useState<Cupons2[]>([]);
  const [list3, setList3] = useState<diaSemanaCupom[]>([]);

  useEffect(() => {
    // fetchCupons2();
    fetchCuponsOneWeek();
  }, []);

  async function deleteOneCupom(id: number) {
    const info = await serviceCupons.deleteOneCupom(id);
    fetchCupons2();
    // fetchCuponsOneWeek();
    console.log('Information returned', info);
  }

  async function fetchCupons2() {
    const cupons = await serviceCupons.fetchAll2();
    setList2(cupons);
  }
  async function fetchCuponsOneWeek() {
    const cupons = await serviceCupons.fetchCuponsOneWeek();

    let valuesWeek: Array<diaSemanaCupom> = [];
    let valuesWeek2: Array<diaSemanaCupomNumber> = [];
    const valorDiaSemana: Array<number> = [0,0,0,0,0,0,0];

    // console.log(valorDiaSemana);
    // const numbers: Array<number> = [];
    cupons.forEach((element) => {
      // console.log(typeof element);
      let {
        dataHoraCupom,
        endereco,
        id,
        itensdoCupom,
        valorTotalCupom,
        ...rest
      } = element;
      // let valorTotalCupomS = valorTotalCupom.replace(/(\,)/g, '.');
      let valorTotalCupomS = parseFloat(valorTotalCupom.replace(/(\,)/g, '.'));
      console.log(dataHoraCupom)


      let diaCupom = new Date(dataHoraCupom * 1000);
      let diaSemanaCupom = diaCupom.getDay();
      // domingo - sabado : 0 - 6
      // console.log(diaSemanaCupom);
      if (diaSemanaCupom === 0) {
        //Se existe valor de "valorDiaSemana[0]" soma valorTotalCupomS + valorDiaSemana[0] senão valorTotalCupomS
        valorDiaSemana[0] = valorDiaSemana[0] ? (valorTotalCupomS + valorDiaSemana[0]):(valorTotalCupomS);
        // console.log('domingo');
        // console.log(valorDiaSemana[0])
      }
      if (diaSemanaCupom === 1) {
        // console.log('segunda');
        valorDiaSemana[1] = valorDiaSemana[1] ? (valorTotalCupomS + valorDiaSemana[1]):(valorTotalCupomS);
      }
      if (diaSemanaCupom === 2) {
        // console.log('terca');
        valorDiaSemana[2] = valorDiaSemana[2] ? (valorTotalCupomS + valorDiaSemana[2]):(valorTotalCupomS);
      }
      if (diaSemanaCupom === 3) {
        // console.log('quarta');
        valorDiaSemana[3] = valorDiaSemana[3] ? (valorTotalCupomS + valorDiaSemana[3]):(valorTotalCupomS);
      }
      if (diaSemanaCupom === 4) {
        // console.log('quinta');
        valorDiaSemana[4] = valorDiaSemana[4] ? (valorTotalCupomS + valorDiaSemana[4]):(valorTotalCupomS);
      }
      if (diaSemanaCupom === 5) {
        // console.log('sexta');
        valorDiaSemana[5] = valorDiaSemana[5] ? (valorTotalCupomS + valorDiaSemana[5]):(valorTotalCupomS);
      }
      if (diaSemanaCupom === 6) {
        // console.log('sabado');
        valorDiaSemana[6] = valorDiaSemana[6] ? (valorTotalCupomS + valorDiaSemana[6]):(valorTotalCupomS);
      }
    });

    // console.log(valorDiaSemana)
    // valorDiaSemana.sort((a, b) => a - b);
    // console.log(valorDiaSemana)

   
    // Object.values(valorDiaSemana).forEach((element) => {
    valorDiaSemana.forEach((value, index) => {

      // console.log(index)

      if (index === 0) {
        // let valueLocalString  = (value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        let register = {
          name: 'Domingo',
          value: value,
          peso:0
        };
        let register2 = {
          index,
          value
        }
        valuesWeek.push(register)
        valuesWeek2.push(register2)
      }
      if (index === 1) {
        // let valueLocalString  = (value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        let register = {
          name: 'Segunda',
          value: value,
          peso:0
        };
        let register2 = {
          index,
          value
        }
        valuesWeek.push(register)
        valuesWeek2.push(register2)
      }
      if (index === 2) {
        // let valueLocalString  = (value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        let register = {
          name: 'Terça',
          value: value,
          peso:0
        };
        let register2 = {
          index,
          value
        }
        valuesWeek.push(register)
        valuesWeek2.push(register2)
      }
      if (index === 3) {
        // let valueLocalString  = (value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        let register = {
          name: 'Quarta',
          value: value,
          peso:0
        };
        let register2 = {
          index,
          value
        }
        valuesWeek.push(register)
        valuesWeek2.push(register2)
      }
      if (index === 4) {
        // let valueLocalString  = (value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        let register = {
          name: 'Quinta',
          value: value,
          peso:0
        };
        let register2 = {
          index,
          value
        }
        valuesWeek.push(register)
        valuesWeek2.push(register2)
      }
      if (index === 5) {
        // let valueLocalString  = (value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        let register = {
          name: 'Sexta',
          value: value,
          peso:0
        };
        let register2 = {
          index,
          value
        }
        valuesWeek.push(register)
        valuesWeek2.push(register2)
      }
      if (index === 6) {
        // let valueLocalString  = (value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        let register = {
          name: 'Sábado',
          value: value,
          peso:0
        };
        let register2 = {
          index,
          value
        }
        valuesWeek.push(register)
        valuesWeek2.push(register2)
      }
      // console.log(index , value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        // const formatado = salarioHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });
    
    // let valuesWeekSorted = valuesWeek.sort((a, b) => a.value - b.value);
    let namesWeekSorted = valuesWeek2.sort((a, b) => a.value - b.value);

    // console.log(namesWeekSorted) 

    namesWeekSorted.forEach((value, index) => {
      
      if (index === 0) {
        let peso = 0
        valuesWeek[value.index].value === 0 ?  valuesWeek[value.index].peso = 0 : valuesWeek[value.index].peso = peso
        // console.log(value.value)
        
      }
      if (index === 1) {
        let peso = 1
        valuesWeek[value.index].value === 0 ?  valuesWeek[value.index].peso = 0 : valuesWeek[value.index].peso = peso
        // console.log(value.value)
      }
      if (index === 2) {
        let peso = 2
        valuesWeek[value.index].value === 0 ?  valuesWeek[value.index].peso = 0 : valuesWeek[value.index].peso = peso
        // console.log(value.value)
      }
      if (index === 3) {
        let peso = 3
        valuesWeek[value.index].value === 0 ?  valuesWeek[value.index].peso = 0 : valuesWeek[value.index].peso = peso
        // console.log(value.value)
        
      }
      if (index === 4){
        let peso = 4
        valuesWeek[value.index].value === 0 ?  valuesWeek[value.index].peso = 0 : valuesWeek[value.index].peso = peso
        // console.log(value.value)
        
      }
      if (index === 5) {
        let peso = 5
        valuesWeek[value.index].value === 0 ?  valuesWeek[value.index].peso = 0 : valuesWeek[value.index].peso = peso
        // console.log(value.value)
        
      }
      if (index === 6) {
        let peso = 6
        valuesWeek[value.index].value === 0 ?  valuesWeek[value.index].peso = 0 : valuesWeek[value.index].peso = peso
        // console.log(value.value)
        
      }
      // console.log('Value', value)
      // console.log('Index', index)
    });
    
    // console.log(valuesWeek)
    
    // console.log(namesWeekSorted)
    setList3(valuesWeek);
    // setList2(cupons);
    
  }

  async function findOneBy(id: number) {
    console.log(id);
    const info = await serviceCupons.findOneBy({ id: id });
    console.log('Information returned: ', info.sourceUrl);
  }

  // const convertDate = (date: number) => {
  //   var epoch = date;
  //   var date = new Date(epoch * 1000);
  //   console.log(date);
  //   console.log('Converting date:', date);
  // };
  const getTextStyle = (peso: number) => {
    if (peso === 0) {
      //https://stackoverflow.com/questions/52449976/how-to-use-vw-and-vh-css-with-react-native
      let percentage = (Dimensions.get('window').width - (41*(Dimensions.get('window').width/100)))
      return {
        backgroundColor: '#C7C7FF',
        marginRight: percentage,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color: '#606264',
      }
    }
    if (peso === 1) {
      let percentage = (Dimensions.get('window').width - (55*(Dimensions.get('window').width/100)))
      return {
        backgroundColor: '#BABAFF',
        marginRight: percentage,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color: '#606264',
      }
    }
    if (peso === 2) {
      let percentage = (Dimensions.get('window').width - (62*(Dimensions.get('window').width/100)))
      return {
        backgroundColor: '#ACACFF',
        marginRight: percentage,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color: '#606264',
      }
    }
    if (peso === 3) {
      let percentage = (Dimensions.get('window').width - (69*(Dimensions.get('window').width/100)))
      return {
        backgroundColor: '#9E9EFF',
        marginRight: percentage,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color: '#F2F5FC',
      }
    }
    if (peso === 4) {
      let percentage = (Dimensions.get('window').width - (76*(Dimensions.get('window').width/100)))
      return {
        backgroundColor: '#9090FF',
        marginRight: percentage,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color: '#F2F5FC',
      }
    }
    if (peso === 5) {
      let percentage = (Dimensions.get('window').width - (83*(Dimensions.get('window').width/100)))
      return {
        backgroundColor: '#8282FF',
        marginRight: percentage,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color: '#F2F5FC',
      }
    }
    if (peso === 6) {
      // let percentage = (Dimensions.get('window').width - (93*(Dimensions.get('window').width/100)))

      return {
        backgroundColor: '#7575FF',
        // marginRight: percentage,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color: '#F2F5FC',
      }
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
        style={{width: '100%'}}
          ListHeaderComponent={UrlHeader}
          ItemSeparatorComponent={SeparatorItem}
          data={list3}
          extraData={list3}
          keyExtractor={(item) => String(item.name)}
          // renderItem={({ item }) => <Text style={styles.item}>{item.id}</Text>}
          renderItem={({ item }) => (
            // <TouchableOpacity onPress={() => convertDate(item.dataHoraCupom)}>
            // <TouchableOpacity onPress={() => findOneBy(item.id)}>
            // <View style={styles.row}>
            //   </View>

            <TouchableOpacity onPress={() => {}}>
              {/* <Text style={styles.item}>{item.peso} - {(item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}</Text> */}
              {/* {item.isCompleted ? (
                <Text style={styles.itemCompleted}>{item.id}</Text>
              ) : (
                <Text style={styles.item}>{item.id}</Text>
              )} */}
              
              {/* <Text style={[styles.text, touched && invalid ? styles.textinvalid : styles.textvalid]}></Text> */}
              
              <Text style={getTextStyle(item.peso)}>{item.name} - {(item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}</Text>


            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: StatusBar.currentHeight || 0,
  },

  row:{
    flex: 1,
    // paddingVertical: 25,
    // paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#7575ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    color: '#fff',
  },

  itemValue: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemCompleted: {
    backgroundColor: '#969A9D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
