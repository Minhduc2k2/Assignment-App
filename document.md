# React Select

```cmd
npm install react-select
```

```js
import Select from "react-select";

const [category, setCategory] = useState(null);

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

<Select options={categories} onChange={(option) => setCategory(option)} />;
//-------------------------------------------------------------------------------------
const [assignedUsers, setAssignedUsers] = useState([]);
const { document } = useCollection("users");
const [users, setUsers] = useState([]);
useEffect(() => {
  if (document) {
    const options = document.map((user) => {
      return { value: user, label: user.displayName };
    });
    setUsers(options);
  }
}, [document]);
<Select
  options={users}
  onChange={(option) => setAssignedUsers(option)}
  isMulti
/>;
```

# date-fns

Provides the most comprehensive, yet simple and consistent toolset
for manipulating JavaScript dates in a browser & Node.js.

```cmd
npm install date-fns --save
```

```js
import formatDistanceToNow from "date-fns/formatDistanceToNow";

formatDistanceToNow(comment.createAt.toDate(), { addSuffix: true });

// time... ago
```
