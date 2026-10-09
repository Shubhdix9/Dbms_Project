const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/app/student/property/[id]/page.tsx');
let content = fs.readFileSync(p, 'utf8');

const replacement = `          {/* Roommate Matching Box */}
          <div className="bg-white rounded-2xl p-6 border-2 border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-extrabold text-foreground flex items-center">
                <Users size={18} className="mr-2 text-primary-orange" /> Looking for Roommates
              </h2>
            </div>
            <p className="text-xs text-text-secondary mb-4">Create a group to show you are looking for roommates to split rent here.</p>
            
            <button 
              disabled={isAdded}
              onClick={async () => {
                if (!currentUser) return alert('Please login first');
                const res = await createOnePersonGroup(id, currentUser);
                if (res.success) {
                  setIsAdded(true);
                  alert('Group created successfully! Go to the Roommate Dashboard to invite others.');
                } else {
                  alert(res.error);
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
            </button>
            {!isAdded && (
               <p className="text-center text-[10px] text-text-secondary mt-3 font-medium">This creates a group. You can then invite matches.</p>
            )}
          </div>
        </div>`;

const startIdx = content.indexOf('{/* Roommate Matching Box */}');
const endDivStr = '{!isAdded && (\n               <p className="text-center text-[10px] text-text-secondary mt-3">We will share your basic profile with other verified students.</p>\n            )}\n          </div>';
const endIdx = content.indexOf(endDivStr) + endDivStr.length;

if (startIdx > -1 && endIdx > startIdx) {
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync(p, content);
  console.log('Success');
} else {
  console.log('Failed to find indices', startIdx, endIdx);
}
