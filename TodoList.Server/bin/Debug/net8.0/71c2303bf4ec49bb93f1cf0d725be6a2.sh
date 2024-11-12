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

ps 14573;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 14573 > /dev/null;
done;

for child in $(list_child_processes 14574);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/shyamshekar/Downloads/TodoList 2/TodoList.Server/bin/Debug/net8.0/71c2303bf4ec49bb93f1cf0d725be6a2.sh;
