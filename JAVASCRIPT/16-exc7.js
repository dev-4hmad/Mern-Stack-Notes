function isTriangle(a,b,c)
{
   if (a>0&&b>0&&c>0&&a+b>c&&b+c>a&&c+a>b){
     return true
   } else{
     return false
   }
}
isTriangle(1,2,2);  
isTriangle(4,2,3);  
isTriangle(-5,1,3); 