const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/app/student/property/[id]/page.tsx');
let content = fs.readFileSync(p, 'utf8');

content = content.replace(
  "import { getIntentsAction, saveIntentAction, removeIntentAction } from '@/app/actions/intents';",
  "import { getUserGroups, createOnePersonGroup } from '@/app/actions/collaboration';"
);

content = content.replace(
  "const [dynamicStudents, setDynamicStudents] = useState<any[]>(STUDENTS);",
  "const [propertyGroups, setPropertyGroups] = useState<any[]>([]);\n  const [dynamicStudents, setDynamicStudents] = useState<any[]>(STUDENTS);"
);

content = content.replace(
  "getIntentsAction().then(intents => {",
  "supabase.auth.getUser().then(async ({ data }) => {\n      if (data?.user) {\n        setCurrentUser(data.user);\n        const groups = await getUserGroups(data.user.id);\n        const hasProperty = groups.some(g => g.propertyId === id);\n        setIsAdded(hasProperty);\n      }\n    });\n    getIntentsAction().then(intents => {"
);

// We need to replace the button onClick logic.
const buttonOld = `            <button 
              onClick={() => {
                const newAddedState = !isAdded;
                setIsAdded(newAddedState);
                if (newAddedState) {
                  localStorage.setItem('preferred_property_id', property.id);
                  localStorage.setItem('preferred_property_name', property.title);
                  
                  if (currentUser) {
                    const newIntent = {
                      id: currentUser.id,
                      name: currentUser.user_metadata?.name || currentUser.email || 'Student',
                      course: currentUser.user_metadata?.course || 'Student',
                      year: currentUser.user_metadata?.year || 1,
                      gender: currentUser.user_metadata?.gender || 'MALE',
                      imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80',
                      verified: true,
                      preferences: { budgetMin: 8000, budgetMax: 15000, sleepTime: '11:00 PM', wakeTime: '7:00 AM', cleanliness: 'High', noiseTolerance: 'Medium', studyHabits: 'Focused', smoking: 'Non-smoker', preferredPropertyId: property.id }
                    };
                    saveIntentAction(newIntent).then(intents => {
                      setDynamicStudents([...STUDENTS, ...intents]);
                    });
                  }
                } else {
                  localStorage.removeItem('preferred_property_id');
                  localStorage.removeItem('preferred_property_name');
                  
                  if (currentUser) {
                    removeIntentAction(currentUser.id).then(filtered => {
                      setDynamicStudents([...STUDENTS, ...filtered]);
                    });
                  }
                }
              }}
              className={\`w-full mt-4 font-extrabold py-2.5 text-xs uppercase tracking-wider rounded-xl border-2 transition-colors \${
                isAdded 
                  ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100' 
                  : 'bg-surface text-primary-blue border-border hover:bg-surface-light'
              }\`}
            >
              {isAdded ? 'Added to List' : 'Add Myself to List'}
            </button>`;

const buttonNew = `            <button 
              disabled={isAdded}
              onClick={async () => {
                if (!currentUser) return alert('Please login first');
                const res = await createOnePersonGroup(id, currentUser);
                if (res.success) {
                  setIsAdded(true);
                  alert('Group created successfully! Go to the Roommate Dashboard to invite others.');
                } else {
                  alert(res.error || 'Failed to create group');
                }
              }}
              className={\`w-full font-extrabold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center text-sm
                \${isAdded 
                  ? 'bg-surface-light text-text-secondary border-2 border-border cursor-not-allowed' 
                  : 'bg-primary-blue text-white hover:bg-blue-900 shadow-blue-900/20'
                }\`}
            >
              {isAdded ? (
                <><CheckCircle size={16} className="mr-2"/> Group Created - See Dashboard</>
              ) : (
                'Add Myself to List'
              )}
            </button>`;

content = content.replace(buttonOld, buttonNew);
fs.writeFileSync(p, content);
console.log('Success');
