import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Switch,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import {
  ArrowLeft,
  Plus,
  X,
  ChevronDown,
  Clock,
  Users,
  BookOpen,
  Save,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CreateLessonScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  // Form state
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [duration, setDuration] = useState('30');
  const [objectives, setObjectives] = useState(['']);
  const [materials, setMaterials] = useState(['']);
  const [isPublished, setIsPublished] = useState(false);

  // Dropdown state
  const [levelOpen, setLevelOpen] = useState(false);
  const [levelValue, setLevelValue] = useState('intermediate');
  const [levelItems, setLevelItems] = useState([
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState('business');
  const [categoryItems, setCategoryItems] = useState([
    { label: 'Business English', value: 'business' },
    { label: 'Cultural Communication', value: 'cultural' },
    { label: 'Tourism & Hospitality', value: 'tourism' },
    { label: 'Academic English', value: 'academic' },
  ]);

  // Handle adding new objective
  const addObjective = () => {
    setObjectives([...objectives, '']);
  };

  // Handle removing an objective
  const removeObjective = (index: any) => {
    const newObjectives = [...objectives];
    newObjectives.splice(index, 1);
    setObjectives(newObjectives);
  };

  // Handle updating an objective
  const updateObjective = (text: any, index: any) => {
    const newObjectives = [...objectives];
    newObjectives[index] = text;
    setObjectives(newObjectives);
  };

  // Handle adding new material
  const addMaterial = () => {
    setMaterials([...materials, '']);
  };

  // Handle removing a material
  const removeMaterial = (index: any) => {
    const newMaterials = [...materials];
    newMaterials.splice(index, 1);
    setMaterials(newMaterials);
  };

  // Handle updating a material
  const updateMaterial = (text: any, index: any) => {
    const newMaterials = [...materials];
    newMaterials[index] = text;
    setMaterials(newMaterials);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!lessonTitle.trim()) {
      Alert.alert('Error', 'Please enter a lesson title');
      return;
    }

    if (!lessonDescription.trim()) {
      Alert.alert('Error', 'Please enter a lesson description');
      return;
    }

    // Filter out empty objectives and materials
    const filteredObjectives = objectives.filter((obj) => obj.trim() !== '');
    const filteredMaterials = materials.filter((mat) => mat.trim() !== '');

    if (filteredObjectives.length === 0) {
      Alert.alert('Error', 'Please add at least one learning objective');
      return;
    }

    // Create lesson object
    const lessonData = {
      title: lessonTitle,
      description: lessonDescription,
      level: levelValue,
      category: categoryValue,
      duration: parseInt(duration),
      objectives: filteredObjectives,
      materials: filteredMaterials,
      isPublished,
      createdAt: new Date().toISOString(),
    };

    console.log('Lesson created:', lessonData);

    // Show success message and navigate back
    Alert.alert('Success', 'Lesson created successfully!', [
      {
        text: 'OK',
        onPress: () => router.push('/(teacher)'),
      },
    ]);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/(teacher)')}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Lesson</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Save size={24} color="#E1742F" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Lesson Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Lesson Title</Text>
              <TextInput
                style={styles.textInput}
                value={lessonTitle}
                onChangeText={setLessonTitle}
                placeholder="Enter lesson title"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={lessonDescription}
                onChangeText={setLessonDescription}
                placeholder="Describe the lesson content and goals"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Level</Text>
                <DropDownPicker
                  open={levelOpen}
                  value={levelValue}
                  items={levelItems}
                  setOpen={setLevelOpen}
                  setValue={setLevelValue}
                  setItems={setLevelItems}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  textStyle={styles.dropdownText}
                  zIndex={3000}
                  zIndexInverse={1000}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Duration (minutes)</Text>
                <View style={styles.durationContainer}>
                  <Clock size={20} color="#666" style={styles.durationIcon} />
                  <TextInput
                    style={styles.durationInput}
                    value={duration}
                    onChangeText={(text) => {
                      // Only allow numbers
                      const numericValue = text.replace(/[^0-9]/g, '');
                      setDuration(numericValue);
                    }}
                    keyboardType="numeric"
                    placeholder="30"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <DropDownPicker
                open={categoryOpen}
                value={categoryValue}
                items={categoryItems}
                setOpen={setCategoryOpen}
                setValue={setCategoryValue}
                setItems={setCategoryItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                zIndex={2000}
                zIndexInverse={2000}
              />
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Learning Objectives</Text>
            <Text style={styles.sectionDescription}>
              Define what students will learn from this lesson
            </Text>

            {objectives.map((objective, index) => (
              <View key={`objective-${index}`} style={styles.listItemContainer}>
                <TextInput
                  style={styles.listItemInput}
                  value={objective}
                  onChangeText={(text) => updateObjective(text, index)}
                  placeholder={`Objective ${index + 1}`}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeObjective(index)}
                  disabled={objectives.length === 1 && index === 0}
                >
                  <X
                    size={20}
                    color={
                      objectives.length === 1 && index === 0
                        ? '#ccc'
                        : '#E1742F'
                    }
                  />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={addObjective}>
              <Plus size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add Objective</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Materials & Resources</Text>
            <Text style={styles.sectionDescription}>
              Add links to resources or list materials needed
            </Text>

            {materials.map((material, index) => (
              <View key={`material-${index}`} style={styles.listItemContainer}>
                <TextInput
                  style={styles.listItemInput}
                  value={material}
                  onChangeText={(text) => updateMaterial(text, index)}
                  placeholder={`Material ${index + 1}`}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeMaterial(index)}
                  disabled={materials.length === 1 && index === 0}
                >
                  <X
                    size={20}
                    color={
                      materials.length === 1 && index === 0 ? '#ccc' : '#E1742F'
                    }
                  />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={addMaterial}>
              <Plus size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add Material</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <View style={styles.publishContainer}>
              <View>
                <Text style={styles.publishTitle}>Publish Lesson</Text>
                <Text style={styles.publishDescription}>
                  Make this lesson available to students
                </Text>
              </View>
              <Switch
                value={isPublished}
                onValueChange={setIsPublished}
                trackColor={{ false: '#E0E0E0', true: '#FEF3DD' }}
                thumbColor={isPublished ? '#E1742F' : '#999'}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#E1742F', '#F2994A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitText}>Create Lesson</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  saveButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 48,
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EBEBEB',
    borderRadius: 8,
    borderWidth: 1,
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  durationIcon: {
    marginRight: 8,
  },
  durationInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  listItemInput: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1742F',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  addButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  publishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  publishTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  publishDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
