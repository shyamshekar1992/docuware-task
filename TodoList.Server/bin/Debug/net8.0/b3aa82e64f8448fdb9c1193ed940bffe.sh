function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 63321;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 63321 > /dev/null;
done;

for child in $(list_child_processes 63322);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/shyamshekar/Downloads/TodoList 2/TodoList.Server/bin/Debug/net8.0/b3aa82e64f8448fdb9c1193ed940bffe.sh;
