
// 22/10/2025  ->
// When users increases or for leaning calculate the basic calculations such as total income , total expenses etc. in backend. 
 // why?  ------->

//  | Factor                | Backend Calculation        | Frontend Calculation           |
// | --------------------- | -------------------------- | ------------------------------ |
// | **Speed**             | ⚡ Very fast (done in DB)   | 🐢 Slower (loops in JS)        |
// | **Data Transfer**     | Minimal (only totals)      | Heavy (all data sent)          |
// | **Security**          | ✅ Safe (raw data hidden)   | ❌ Exposes data                 |
// | **Scalability**       | ✅ Handles millions easily  | ❌ Crashes for large sets       |
// | **Logic Consistency** | ✅ Single source of truth   | ❌ Must repeat in each frontend |
// | **Best Use Case**     | Totals, analytics, reports | Small datasets, UI filters     |
